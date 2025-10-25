import { Container } from "../../components/container";

export function Home() {
    return (
        <Container>

            <section className="flex justify-center items-center mx-auto gap-4 bg-gray-50 max-w-3xl rounded-lg h-15 shadow-md px-4 w-full ">
                <input className="w-10/12 border-slate-400 p-1 px-2 border-1 rounded-lg "
                    placeholder="Insira o nome do veiculo..." />

                <button className="bg-red-600 px-4 py-1 rounded-lg text-white font-semibold cursor-pointer">
                    Buscar
                </button>
            </section>
            
            <h1 className="text-center font-medium text-2xl py-8">Carros novos e usados em todo Brasil</h1>

            <main className="grid grid-cols-1 w-full max-w-7xl md:grid-cols-2 lg:grid-cols-3 gap-6">
                <section className="flex flex-col shadow-md p-2 rounded-lg hover:scale-105 transition-transform ">
                    <img className="rounded-lg"
                    src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202508/20250818/bmw-m3-3.0-i6-twinturbo-gasolina-competition-m-steptronic-wmimagem17163495874.jpg?s=fill&w=552&h=414&q=60" alt="Carroimg" />

                    <strong className="py-2">BMW M3 SPORT</strong>
                    <div className="flex flex-col gap-5">
                        <span className="text-zinc-600">Ano 2023 | 2400 km</span>
                        <strong>R$ 356.990</strong>
                    </div>
                    <div className="bg-gray-300 h-px mt-2 mb-2"> </div>
                    <span>Belo Horizonte - MG</span>
                </section>
            </main>
        </Container>
    )
}

