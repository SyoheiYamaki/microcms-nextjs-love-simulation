'use client';

import styles from "./page.module.css";
import { useUser } from "./context/UserContext";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

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
      <h1>恋愛シミュレーションゲーム（ロゴ入れる予定）</h1>
      <form
        className={styles.inner}
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
        <button
          className={styles.button}
        >
          はじめる！！
        </button>
      </form>
    </div>
  );
}
