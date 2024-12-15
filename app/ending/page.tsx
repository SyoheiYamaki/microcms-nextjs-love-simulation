import styles from "./page.module.scss";
import Image from 'next/image';
import Link from 'next/link'

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Image
          src="/logo.webp"
          alt="1つのAPIで紡ぐマイクロストーリー"
          width={523}
          height={183}
          className={styles.logo}
        />
        <div className={styles.body}>
          最後までプレイしていただき、ありがとうございました。<br />
          こちらのゲームは以下の方々のご協力のもと、制作されております。
          <ul>
            <li>キャラクターイラスト：ぜろたまご様</li>
            <li>背景イラスト：みんちりえ様</li>
            <li>ヘッドレスCMS：microCMS様</li>
            <li>開発者：やましょ</li>
          </ul>
        </div>
        <Link href="/" className={styles.link}>
          トップページにもどる
        </Link>
      </div>
    </div>
  )
}