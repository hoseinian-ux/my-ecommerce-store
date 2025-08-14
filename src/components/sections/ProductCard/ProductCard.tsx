import { Product } from '@/types/product'
import styles from './ProductCard.module.scss'
import AddToCartButton from '@/components/ui/Btn/AddToCartButton'
import Image from 'next/image'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <div className={styles.card}>
     <Image src={product.image} alt={product.title} className={styles.image} width={100} height={300}/>
      <h3 className={styles.title}>{product.title}</h3>
      <p className={styles.price}>{product.price.toLocaleString()} تومان</p>
      <div className={styles.spacer}></div>
      <AddToCartButton product={product} />
    </div>
  )
}
