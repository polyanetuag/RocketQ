export default function Modal() {

  const modalWrapper = document.querySelector('.modal-wrapper')

  const cancelButton = document.querySelector('.button.cancel')

  cancelButton.addEventListener("click", close)

  function open() {
    //funcionalidade p/ atribuir a classe active para abrir o modal
    modalWrapper.classList.add("active")
  }
  function close() {
    //funcionalidade p/ remover a classe active para fechar o modal
    modalWrapper.classList.remove("active")
  }

  return {
    open,
    close
  }
}