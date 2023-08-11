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
    loadRegister,
  } = useRegisterLogin();
  return (
    <>
      <div class="section">
        <div class="container">
          <div class="row  justify-content-center">
            <div class="col-12 text-center align-self-center py-5">
              <div class="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 class="mb-0 pb-3">
                  <span>Iniciar Sesion </span>
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
                          <h4 class="mb-4 pb-3">Iniciar Sesion</h4>
                          <LoginForm
                            initialValLogin={initialValLogin}
                            handleUserLogin={handleUserLogin}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="card-back">
                      <div class="center-wrap">
                        <div class="section text-center">
                          <h4 class="mb-4 pb-3">Registrarse</h4>
                          <RegisterForm />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {alertLogIn || loadLogin && <RocketLoader title="Iniciando Sesion..."/>}
      </div>
    </>
  );
};
