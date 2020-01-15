/** @format */

export default {
	discountPrice(product) {
		if (product.discount) {
			return (product.price * (1 - product.discount)).toFixed(2)
		} else {
			return product.price
		}
	},
}
