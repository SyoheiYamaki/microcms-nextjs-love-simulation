'use client';

import styles from "./page.module.css";
import { useUser } from "./context/UserContext";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Image from "next/image";

export default function Home() {
  const { setName } = useUser();
  const router = useRouter();
  const [inputName, setInputName] = useState("");

  const handleStart = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputName.trim()) {
      setName(inputName.trim());
      router.push("/story");
    }
  }
  return (
    <div className={styles.container}>
      <Image
        src="/logo.webp"
        alt="1つのAPIで紡ぐマイクロストーリー"
        width={1023}
        height={393}
        className={styles.logo}
      />
      <form
        className={styles.form}
        onSubmit={(e) => handleStart(e)}
      >
        <input
          type="text"
          placeholder="あなたの名前を入力してください"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          className={styles.input}
          required
        />
        <p className={styles.note}>※ 入力された名前は保存されませんし、悪用もしませんのでご安心ください。</p>
        <button
          className={styles.button}
        >
          はじめる！！
        </button>
      </form>
    </div>
  );
}
