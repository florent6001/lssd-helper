import toast from "react-hot-toast"

export default function Result({ children }) {

  const copyText = () => {
    navigator.clipboard.writeText(document.getElementById('result').innerHTML)
    toast.success('Le texte a été copié avec succès.')
  }

  return (
    <>
      <textarea className="w-full text-black" id="result" rows={'10'} defaultValue={children}></textarea>
      <div className="text-center pt-5">
        <button onClick={() => copyText()} className="text-black font-bold bg-secondary px-5 py-2 rounded">Copier le résultat</button>
      </div>
    </>
  )
}
