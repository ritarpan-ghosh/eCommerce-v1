import axios from "axios";

const api = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:1337',
  headers: {
    'Authorization': `Bearer ${process.env.BACKEND_API_KEY || 'ca9ed67ca0a3a41270b08eb2fe4bf8819f6ed346b00fa01a578eb9c4d75aa4670875ff31fe8eab5a067671342a292d7454ba9a0d037b638542fdecafd0b16d4033aa4dcb26563a19613f2ca9f243088a2a6ca03403a7679c0f6af8c26052601c35029d920e716a9e722706276816832a073c0475fe7d95bb5258303fcf8c1624'}`
  }
})

export const fetchProducts = async () => {
  const res = await api.get('/api/products?populate=*')
  return res
}
export const fetchSingleProduct = async (slug) => {
  const res = await api.get(`/api/products?filters[slug]=${slug}&populate=*`)
  return res
}

export const makePaymentRequest = async (payload) => {
  const res = await api.post(`/api/orders`, JSON.parse(JSON.stringify(payload)))
  console.log(res)
  return JSON.parse(JSON.stringify(res))
}