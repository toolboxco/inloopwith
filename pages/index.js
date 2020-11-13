import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inloopwith</title>
      </Head>

      <main className={styles.main}>Inloopwith.xyz</main>
    </div>
  );
}
