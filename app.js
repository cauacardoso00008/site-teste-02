import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

// 🔥 CONFIG DO SEU FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyB-s6x14cpoCzmeS4GVpx6n1-dZBdn8GDo",
  authDomain: "site-02-e50d8.firebaseapp.com",
  databaseURL: "COLE_AQUI_SEU_DATABASE_URL",
  projectId: "site-02-e50d8",
  storageBucket: "site-02-e50d8.firebasestorage.app",
  messagingSenderId: "598725850557",
  appId: "1:598725850557:web:0a2a548b99695eb8970ed4"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const form = document.getElementById("form-recado");
const lista = document.getElementById("lista-recados");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const autor = document.getElementById("autor").value.trim();
  const turma = document.getElementById("turma").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (!autor || !turma || !mensagem) {
    alert("Preencha todos os campos.");
    return;
  }

  push(ref(db, "recados"), {
    autor,
    turma,
    mensagem
  });

  form.reset();
});

onValue(ref(db, "recados"), (snapshot) => {
  lista.innerHTML = "";

  if (!snapshot.exists()) {
    lista.innerHTML = "<p>Nenhum recado ainda.</p>";
    return;
  }

  snapshot.forEach((item) => {
    const dados = item.val();

    lista.innerHTML += `
      <div class="recado">
        <strong>${dados.autor}</strong> - ${dados.turma}
        <p>${dados.mensagem}</p>
        <button onclick="removerRecado('${item.key}')">Excluir</button>
      </div>
    `;
  });
});

window.removerRecado = function (id) {
  remove(ref(db, "recados/" + id));
};