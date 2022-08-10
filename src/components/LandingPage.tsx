/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
import { title } from "process";
import { useEffect, useState } from "react";
import Viewer, { MenuBag } from "./Viewer";

const LandingPage = () => {


    //----------------- FUNÇÃO PARA RECEBER O JSON DA API -------------------
    const [dataProduct, setDataProduct] = useState([] as any)

    const getProduct = async () => {

        const url = 'https://api.mercadolibre.com/sites/MLB/search?category=categoryId&q=celular#json'
        
        await fetch(url)
            .then(async function(response){
                const data = await response.json()
                const results = await data.results

                await results.forEach( (product: any) => {    
                    // console.log(product)           
                    setDataProduct((currentList : any) => [...currentList, product])
                    
                })

                if(response.ok){
                    return console.log('Dados da API recebidos com sucesso!');
                }

                
                
            })
            .catch(function(error){
                return console.log('Falha no recebimento dos dados da API. Erro: ' + error.message);
                
            })
        
    }



    //---------------- FUNÇÃO PARA BUSCAR PRODUTO PELO NOME ---------------
    const [productToSearch, setProductToSearch] = useState({
        productName: '',
    })
    const [productSearched, setProductSearched] = useState([] as any)

    
    const searchProduct = async() => {

        console.log(productToSearch.productName);
        

       const url = `https://api.mercadolibre.com/sites/MLA/search?q=${productToSearch.productName}`
       fetch(url)
        .then(async function(response){

            const data = await response.json()
            const results = await data.results

            // CRIAÇÃO/REMOÇÃO DE ELEMENTOS HTML
            document.getElementById('asideExbProducts')?.remove()
            const aside = document.createElement('aside')
            aside.className = 'asideExbProducts'
            document.getElementById('sectionAbsolute')?.appendChild(aside)


            // FOREACH NOS PRODUTOS PARA RECEBER SEUS OBJETOS
            await results.forEach( (product: any) => {    
                setProductSearched((currentList : any) => [...currentList, product])
                
                // CRIAÇÃO DOS ELEMENTOS HTML PARA EXIBIR OS PRODUTOS
                const divExbProduct = document.createElement('div')
                divExbProduct.className = 'divExbProduct'
                
                const spanImage = document.createElement('span')
                spanImage.id = 'spanImage'
                spanImage.style.backgroundImage = `url(${product.thumbnail})`
                const h2 = document.createElement('h2')
                h2.textContent = product.title
                const price = document.createElement('div')
                price.className = 'divInfoValues'
                const h3 = document.createElement('h3')
                h3.textContent = `R$ ${product.price}`
                price.appendChild(h3)

                aside.appendChild(divExbProduct).append(spanImage,h2, price)

                console.log(product);
                
                
            })


            if(response.ok){
                return console.log('Dados da API recebidos com sucesso!');
            }
        })
         
    }



    //-------------------- FUNÇÃO PARA O CARRINHO ------------------------
    const [productsBag, setProductsBag] = useState([] as any)
    const [bag, setBag] = useState({
        qtd: 0
    })

    const setBagProduct = (title: string, price: number, qtd: number) => {

        const productSelected = [{
            title: title, 
            price: price, 
            qtd: qtd
        }]

        productSelected.forEach( (product: any) => {
            setProductsBag((currentList: any) => [...currentList, product])
        })

        bag.qtd++

        console.log(productsBag);
        
    }


    useEffect(() => {
        getProduct();
    }, [])



    //----------------- INICIO DA ESTRUTURA HTML -------------------
    return (
        <>
            <header>
                <div className="divSearch">
                    <img onClick={searchProduct} src="https://img.icons8.com/ios-glyphs/480/000000/search--v1.png"/>
                    <input type={'search'} placeholder={'Search product'} 
                    onChange={(event) => setProductToSearch({...productToSearch, productName: event.target.value})}
                    />                
                </div>
                <ul>
                    <li>Store</li>
                    <li>Contact Us</li>
                    <li>Help</li>
                </ul>
                <button id="btnFavorite"/>
                <button id="btnShop" value={0}>
                    <img src="https://img.icons8.com/fluency-systems-regular/96/000000/shopping-cart.png"/>
                    <input id="pQtdProducts" value={bag.qtd}/>
                </button>

            </header>

            {/* EXIBIÇÃO DO CARRINHO */}
            <div className='divExbBag'>
                <span className="spanBackground">
                    <h3>Carrinho</h3>
                    <div>   
                        {productsBag.map((product: any) => {
                            return(
                                <span>
                                    <img src="https://img.icons8.com/external-anggara-basic-outline-anggara-putra/24/000000/external-delete-basic-user-interface-anggara-basic-outline-anggara-putra.png"/>
                                    <h3>{product.title}</h3>
                                    <p>R$ {product.price}</p>
                                </span>
                            )
                        })}
                    </div>
                    <input type={'submit'} value='Próximo: Verificação'/>
                </span>    
            </div>
            

            <section className="sectionAbsolute" id="sectionAbsolute">

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

                    <input id="inputSubmitFilter" type={'submit'} value='Filtrar Produtos'/>
                </aside>
                <aside className="asideExbProducts" id="asideExbProducts">
                    {dataProduct.map((product: any) => {
                        return(
                            <Viewer
                                title={product.title}
                                url={product.thumbnail}
                                attribute={
                                    <ul>
                                        <li>{product.attributes[4].name}: {product.attributes[4].value_name} </li>
                                        <li>{product.attributes[1].name}: {product.attributes[1].value_name} </li>
                                    </ul>
                                }
                                price={product.price} 
                                functionSetProduct={
                                    <button id="btnAddBag" onClick={() => setBagProduct(product.title, product.price, 1)}/>
                                }
                                available_quantity={product.available_quantity}
                                key={product.catalog_id}
                            />
                        )
                    })}
                </aside>
            </section>
        </>
    )
}

export default LandingPage;