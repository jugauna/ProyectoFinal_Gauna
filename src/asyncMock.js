const products = [
    { id: '1', name: 'TV Samsung 50"', price: 100000, category: 'TV', img:'https://images.fravega.com/f300/d7ca24bf5639a7db78c31aa9fa963be8.jpg.webp', stock: 15, description:'Descripcion de Samsung 50"'},
    { id: '2', name: 'TV Samsung 55"', price: 120000, category: 'TV', img:'https://images.fravega.com/f300/71c66532a2129397660653affe213d13.jpg.webp', stock: 6, description:'Descripcion de TV Samsung 55"'},
    { id: '3', name: 'Heladera Philco', price: 120000, category: 'Heladeras', img:'https://http2.mlstatic.com/D_NQ_NP_760060-MLA43980283564_112020-O.webp', stock: 10, description:'Descripcion de Heladera Philco'},
    { id: '4', name: 'Heladera Sigma', price: 20000, category: 'Heladeras', img:'https://images.fravega.com/f300/957cae486d8e2155e2ccfa086b512e19.jpg.webp', stock: 8, description:'Descripcion de Heladera Sigma'},
    { id: '5', name: 'Lavarropas Drean', price: 200000, category: 'Lavarropas', img:'https://images.fravega.com/f300/b73687fba61b795cb7a32a9b3ad23dfb.jpg.webp', stock: 10, description:'Descripcion de Lavarropas Drean'},
]


export const getProducts = (categoryId) => {
    console.log(categoryId)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(products)
        }, 500)
    })
}

export const getProductsByCategory = (categoryId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.filter(prod => prod.category === categoryId))
        }, 500)
    })
}

export const getProductById = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.find(prod => prod.id === id))
        }, 500)
    })
}
