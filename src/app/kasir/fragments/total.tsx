export default function TotalHarga() {
    return(
        <div className="w-full absolute bottom-36 right-0 shadow-xl px-2 py-4 rounded-xl flex flex-col gap-4">
            <h1 className="text-xl">
               Total : <span className="font-semibold text-2xl">20000</span> 
            </h1>
            <button className="btn btn-warning w-full">Bayar</button>
        </div>
    )
}