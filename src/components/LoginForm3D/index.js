import { useRegisterLogin } from "@/hooks/useRegisterLogin";
import { LoginForm } from "../LoginForm";
import { RegisterForm } from "../RegisterForm";
import { RocketLoader } from "../RocketLoader";

export const LoginForm3D = () => {
  const {
    initialValLogin,
    handleUserLogin,
    alertLogIn,
    loadLogin,
    loadRegister
  } = useRegisterLogin();
  return (
    <>
    <div class="section">
      <div class="container">
        <div class="row  justify-content-center">
          <div class="col-12 text-center align-self-center py-5">
            <div class="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 class="mb-0 pb-3">
                <span>Iniciar Session </span>
                <span>Registrarse</span>
              </h6>
              <input
                class="checkbox"
                type="checkbox"
                id="reg-log"
                name="reg-log"
              />
              <label htmlFor="reg-log"></label>
              <div class="card-3d-wrap mx-auto">
                <div class="card-3d-wrapper">
                  <div class="card-front">
                    <div class="center-wrap">
                      <div class="section text-center">
                        <h4 class="mb-4 pb-3">Iniciar Session</h4>
                        {/* <div class="form-group">
                          <input
                            type="email"
                            name="logemail"
                            class="form-style"
                            placeholder="Your Email"
                            id="logemail"
                            autocomplete="off"
                          />
                          <i class="input-icon uil uil-at"></i>
                        </div>
                        <div class="form-group mt-2">
                          <input
                            type="password"
                            name="logpass"
                            class="form-style"
                            placeholder="Your Password"
                            id="logpass"
                            autocomplete="off"
                          />
                          <i class="input-icon uil uil-lock-alt"></i>
                        </div> */}
                        <LoginForm initialValLogin={initialValLogin} handleUserLogin={handleUserLogin}/>
                        {/* <a href="#" class="btn mt-4">
                          submit
                        </a> */}
                        {/* <p class="mb-0 mt-4 text-center">
                          <a href="#0" class="link">
                            Forgot your password?
                          </a>
                        </p> */}
                      </div>
                    </div>
                  </div>
                  <div class="card-back">
                    <div class="center-wrap">
                      <div class="section text-center">
                        <h4 class="mb-4 pb-3">Registrarse</h4>
                        {/* <div class="form-group">
                          <input
                            type="text"
                            name="logname"
                            class="form-style"
                            placeholder="Your Full Name"
                            id="logname"
                            autocomplete="off"
                          />
                          <i class="input-icon uil uil-user"></i>
                        </div>
                        <div class="form-group mt-2">
                          <input
                            type="email"
                            name="logemail"
                            class="form-style"
                            placeholder="Your Email"
                            id="logemail"
                            autocomplete="off"
                          />
                          <i class="input-icon uil uil-at"></i>
                        </div>
                        <div class="form-group mt-2">
                          <input
                            type="password"
                            name="logpass"
                            class="form-style"
                            placeholder="Your Password"
                            id="logpass"
                            autocomplete="off"
                          />
                          <i class="input-icon uil uil-lock-alt"></i>
                        </div>
                        <a href="#" class="btn mt-4">
                          submit
                        </a> */}
                        <RegisterForm/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        alertLogIn||loadLogin&&
      <RocketLoader/>
      }

    </div>
    
    
    </>
  );
};
