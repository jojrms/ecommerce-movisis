import { useEffect, useState } from "react";

const LandingPage = () => {

    const [dataProduct, setDataProduct] = useState([] as any)

    const getProduct = async () => {

        const url = 'https://api.mercadolibre.com/sites/MLB/search?category=categoryId&q=celular#json'
        
        await fetch(url)
            .then(async function(response){
                const data = await response.json()
                const results = data.results

                results.forEach( (product: any) => {               
                    setDataProduct((currentList: any) => [...currentList, product])
                    console.log(dataProduct);
                })

                // return console.log('Dados da API recebidos com sucesso!');
                
                
            })
            .catch(function(error){
                return console.log('Falha no recebimento dos dados da API. Erro ' + error.message);
                
            })
        
    }

    useEffect(() => {
        getProduct();
    }, [])

    return (
        <>
            <header>
                <div>
                    <img src="https://img.icons8.com/ios-glyphs/480/000000/search--v1.png"/>
                    <input type={'search'} placeholder={'Search product'}/>                
                </div>
                <ul>
                    <li>Store</li>
                    <li>Contact Us</li>
                    <li>Help</li>
                </ul>
                <button id="btnFavorite"/>
                <button id="btnShop"/>
            </header>
            <section>
                <aside className="asideFilters">
                </aside>
                <aside className="asideExbProducts"></aside>
            </section>
        </>
    )
}

export default LandingPage;