import { v4 as uuidv4 } from 'uuid';
import './index.css';
type ItemProps = {
  id: string;
  name: string;
  email: string;
};
const form = document.querySelector<HTMLFormElement>('#add-user-form');
const name = document.querySelector<HTMLInputElement>('#name');
const email = document.querySelector<HTMLInputElement>('#email');
const users = document.querySelector<HTMLDivElement>('#user-list');

const userList: ItemProps[] = loadUsers();
userList.forEach(addUser);

//optional chaining
form?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (name?.value === undefined || email?.value === undefined) return;

  const userItem: ItemProps = {
    id: uuidv4(),
    name: name.value,
    email: email.value,
  };
  userList.push(userItem);
  // console.log(userItem);
  addUser(userItem);
  saveUsers();
  name.value = '';
  email.value = '';
});
function addUser(item: ItemProps) {
  const container = document.createElement('div');
  const nameElement = document.createElement('p');
  const emailElement = document.createElement('p');

  nameElement.append(item.name);
  emailElement.append(item.email);
  container.append(nameElement, emailElement);
  users?.append(container);

  container.classList.add(
    'p-6',
    'bg-slate-800',
    'rounded-md',
    'text-center',
    'text-slate-200'
  );
}
function saveUsers() {
  localStorage.setItem('items', JSON.stringify(userList));
}
function loadUsers(): ItemProps[] {
  const data = localStorage.getItem('items');

  if (data == null) return [];
  return JSON.parse(data);
}
