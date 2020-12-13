import s from "./Button.module.css";

export default function Button({ btnLoad }) {
  return (
    <div className={s.container}>
      <button type="button" className={s.button} onClick={btnLoad}>
        Load more
      </button>
    </div>
  );
}
