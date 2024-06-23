import styles from "./index.module.scss";
import { useNavigate } from "react-router";
import { FormEvent, useEffect } from "react";
import { getUser, login, } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Spinner from "../../components/components/Spinner";

const LoginPage = () => {
  const { user, token, isLoading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userId = localStorage.getItem("user");
    if (userId && !user) {
      dispatch(getUser(Number(userId)));
    }
  }, [token, user, dispatch]);

  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const data = new FormData(e.currentTarget);
    // const username = data.get("username") as string;
    // const password = data.get("password") as string;

    const resultAction = await dispatch(login());
    
    if (login.fulfilled.match(resultAction)) {
      navigate("/admin");
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
          <div className={styles.loginContainer}>
            <h2>Login</h2>
            <form action="/login" onSubmit={formSubmitHandler}>
              <div className={styles.formItem}>
                <div className={styles.formField}>
                  <input type="text" name="username" placeholder="Username:" />
                </div>
                <p className={styles.apiSignExample}>
                  admin: <strong>admin</strong>
                </p>
              </div>
              <div className={styles.formItem}>
                <div className={styles.formField}>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password:"
                  />
                </div>
                <p className={styles.apiSignExample}>
                  password <strong>password</strong>
                </p>
              </div>
              <div className={styles.formSubmit}>
                <button type="submit">Sign In</button>
              </div>
            </form>
          </div>
      </div>
    </section>
  );
};

export default LoginPage;
