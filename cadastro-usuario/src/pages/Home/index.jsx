import { useEffect, useState, useRef } from "react";
import "./style.css";
import Lixo from "../../assets/lixo.png";
import api from "../../services/api";

function Home() {
  // Somente código javascript
  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  const [users, setUsers] = useState([]);

  async function getUsers() {
    const usersFromApi = await api.get("/usuarios");
    setUsers(usersFromApi.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function createUsers() {
    await api.post("/usuarios", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });
    getUsers(); // TODO POR QUE ESSA FUNÇÃO ATUALIZA A PAGINA ASSIM QUE UM NOVO REGISTRO É INSERIDO
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);

    getUsers();
  }

  return (
    // Somente código javascript e html
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" name="Nome" type="text" ref={inputName} />
        <input placeholder="Idade" name="Idade" type="number" ref={inputAge} />
        <input placeholder="Email" name="Email" type="email" ref={inputEmail} />
        <button type="button" onClick={createUsers}>
          Cadastrar
        </button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Nome: <span>{user.name}</span>
            </p>
            <p>
              Idade: <span>{user.age}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Lixo} alt="Deletar" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
