import styles from "./loading.module.css"

export default function loading() {
  return (
    <div className={styles.container}>
      <p className={styles.text}>読み込み中...</p>
    </div>
  )
}