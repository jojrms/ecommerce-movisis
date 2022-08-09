const Viewer = ({title, url, attribute, price, functionSetProduct, available_quantity, key}) => {

    return(
        <div className="divExbProduct" key={key}>
            <span id="favorite"/>
            <span id="spanImage" style={{backgroundImage: `url(${url})`}}/>
            <h2>{title}</h2>
            {attribute}
            <div className="divInfoValues">
                <h3><small>R$</small>{price}</h3>
                {functionSetProduct}
                <p className="pAvailable">{available_quantity} disponíveis</p>    
            </div>
        </div>
    )
}

export const MenuBag = ({title, qtd, value}) => {
    return(
        <span>
            <h3>{title}</h3>
            <h3>{qtd}</h3>
            <h3>R${value}</h3>
        </span>
    )
}

export default Viewer;