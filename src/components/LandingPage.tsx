import { useEffect, useState } from "react";
import Viewer from "./Viewer";

const LandingPage = () => {


    //----------------- FUNÇÃO PARA RECEBER O JSON DA API -------------------
    const [dataProduct, setDataProduct] = useState([] as any)

    const getProduct = async () => {

        const url = 'https://api.mercadolibre.com/sites/MLB/search?category=categoryId&q=celular#json'
        
        await fetch(url)
            .then(async function(response){
                const data = await response.json()
                const results = data.results

                results.forEach( (product: any) => {    
                    console.log(product)           
                    setDataProduct((currentList: any) => [...currentList, product])
                    
                })

                if(response.ok){
                    return console.log('Dados da API recebidos com sucesso!');
                }

                
                
            })
            .catch(function(error){
                return console.log('Falha no recebimento dos dados da API. Erro: ' + error.message);
                
            })
        
    }


    //------------- FUNÇÃO PARA GUARDAR O PRODUTO NO CARRINHO -------------
    const [product, setProduct] = useState({
        name: '',
        value: '',
        qtd: 0,
    })

    const addProduct = async (info: []) => {
        console.log(info);
        
    }

    useEffect(() => {
        getProduct();
    }, [])


    //----------------- INICIO DA ESTRUTURA HTML -------------------
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
            <section className="sectionAbsolute">
                <aside className="asideFilters">
                    <h3>Filtros</h3>
                    <span>
                        <h4>Preço</h4>
                        <div>
                            <input type={'number'} placeholder='R$0,00'/>
                            <span/>
                            <input type={'number'} placeholder='R$5000,00'/>
                        </div>
                    </span>
                    <span>
                        <h4>Ordenar</h4>
                        <div>
                            <p>Preço</p>
                            <select>
                                <option>Menor Preço</option>
                                <option>Maior Preço</option>
                            </select>
                        </div>
                        <div>
                            <p>Data de Inclusão</p>
                            <select>
                                <option>Mais Recente</option>
                                <option>Mais Antigo</option>
                            </select>
                        </div>
                    </span>
                </aside>
                <aside className="asideExbProducts">
                    {dataProduct.map((product: any) => {
                        return(
                            <Viewer
                                title={product.title}
                                url={product.thumbnail}
                                attribute={<ul>
                                    <li>{product.attributes[4].name}: {product.attributes[4].value_name} </li>
                                    <li>{product.attributes[1].name}: {product.attributes[1].value_name} </li>
                                </ul>}
                                price={product.price} 
                                functionSetProduct={
                                    <button id="btnAddBag"/>
                                }
                            />
                        )
                    })}
                </aside>
            </section>
        </>
    )
}

export default LandingPage;