import QRCode from "react-qr-code"

export const OpptakPage = () => {
  return(
    <div className="h-full overflow-hidden bg-orange-200">
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="font-bold text-8xl mb-10">
          Komité opptak! Søk Søk! 
        </h1>
        <p className="italic text-6xl mb-10">
          Søknadsfrist 23.august!!
        </p>
        <QRCode value="https://opptak.online.ntnu.no/" size={400}/>
      </div>
    </div>
    
  )
}