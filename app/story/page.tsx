'use client';

import { Scene } from "@/libs/microcms";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MicroCMSImage } from "microcms-js-sdk";
import styles from "./page.module.scss";
import Image from "next/image";

export default function Page() {
  const { name } = useUser();
  const router = useRouter();
  const [scene, setScene] = useState<Scene | null>(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [background, setBackground] = useState<MicroCMSImage | undefined>(undefined);
  const [character, setCharacter] = useState<MicroCMSImage | undefined>(undefined);
  const [messageAnimationClass, setMessageAnimationClass] = useState<string>("");
  const [visibleActions, setVisibleActions] = useState<boolean>(false);

  useEffect(() => {
    if (!name) router.push("/");

    const fetchScene = async () => {
      const response = await fetch("/api/scenes/initial-scene");
      const data: Scene = await response.json();
      setScene(data);

      if (data.background) setBackground(data.background);
    }
    fetchScene();
  }, [router, name])

  const handleNextMessage = () => {
    // MEMO: 次のメッセージが存在する場合
    if (scene && currentMessageIndex < scene.messages.length - 1) {
      setCurrentMessageIndex((prev) => prev + 1);

      const nextMessage = scene.messages[currentMessageIndex + 1];
      const nextCharacter = nextMessage?.character;
      if (nextCharacter) setCharacter(nextCharacter);

      if (nextMessage.animations.length) {
        setMessageAnimationClass(styles[nextMessage.animations[0]])
      }
    } else {
      setVisibleActions(true);
    }
  };

  const handleAction = (action: Scene['actions'][number]) => {
    if (action.type.includes('goToNextScene') && action.next_scene) {
      fetch(`/api/scenes/${action.next_scene.id}`)
        .then((res) => res.json())
        .then((data: Scene) => {
          setVisibleActions(false);
          setScene(data);
          setCurrentMessageIndex(0);
          if (data.background) setBackground(data.background);
          if (data.messages[0].character) setCharacter(data.messages[0].character);
          if (data.messages[0].animations.length) {
            setMessageAnimationClass(styles[data.messages[0].animations[0]])
          }
        });
    } else if (action.type.includes('openUrl') && action.url) {
      // TODO: 種別によって別タブか変更する
      window.open(action.url, "_blank");
    } else if (action.type.includes('gameOver')) {
      router.push("/");
    } else if (action.type.includes('goToEndroll')) {
      router.push("/ending")
    }
  };

  if (!scene) return null;

  const currentMessage = scene.messages?.[currentMessageIndex];

  return (
    <div
      style={{
        backgroundImage: background ? `url(${background.url})` : undefined,
      }}
      className={`${styles.backgorund} ${messageAnimationClass}`}
    >
      <Image
        src="/logo.webp"
        alt="1つのAPIで紡ぐマイクロストーリー"
        width={523}
        height={183}
        className={styles.logo}
      />
      {currentMessage && (
        <div className={styles.container} onClick={handleNextMessage}>
          <p className={styles.speaker}>
            {currentMessage.speaker.includes('me') ? name : 'まい子'}
          </p>
          <p className={styles.text}>
            {currentMessage.text.replaceAll('{name}', name)}
          </p>
        </div>
      )}

      {character && (
        <Image
          src={character.url}
          alt="キャラクター"
          className={styles.character}
          width={900}
          height={1100}
        />
      )}

      {visibleActions && (
        <div className={styles.layer}>
          {scene.actions.map((action) => (
            <button
              key={action.label}
              onClick={() => handleAction(action)}
              className={styles.action}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}