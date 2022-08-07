const Viewer = ({title, url, attribute, price}) => {

    return(
        <div className="divExbProduct">
            <span id="favorite"/>
            <span id="spanImage" style={{backgroundImage: `url(${url})`}}/>
            <h2>{title}</h2>
            {attribute}
            <h3><small>R$</small>{price}</h3>
            <button id="btnAddBag"/>
        </div>
    )
}

export default Viewer;