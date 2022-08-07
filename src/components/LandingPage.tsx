import { useEffect, useState } from "react";

const LandingPage = () => {

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