import { User } from "../../auth/entities/user.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from './product-image.entity';
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'products' })
export class Product {

    @ApiProperty({ 
        example: '57da9b7d-76a8-4705-8418-1ef0b530de32',
        description: 'Product ID',
        uniqueItems: true,
     })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ 
        example: 'Tshirt Teslo',
        description: 'Product Title',
        uniqueItems: true,
     })
    @Column('text', {
        unique: true,
    })
    title: string;

    @ApiProperty({ 
        example: 10,
        description: 'Product Price',
        default: 0
     })
    @Column('float', {
        default: 0
    })
    price: number;

    @ApiProperty({ 
        example: 'Est esse laboris ullamco non culpa aliqua non eiusmod eu labore qui laboris.',
        description: 'Product Descripion',
        uniqueItems: null,
     })
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @ApiProperty({ 
        example: 't_shirt_teslo',
        description: 'Product SLUG - for SEO',
        uniqueItems: true,
     })
    @Column('text',{
        unique: true
    })
    slug: string;

    @ApiProperty({ 
        example: 10,
        description: 'Product stock',
        default: 0,
     })
    @Column('int',{
        default: 0
    })
    stock: number;

    @ApiProperty({ 
        example: ['M', 'XL', 'XXL'],
        description: 'Product sizes',
        uniqueItems: true,
     })
    @Column('text',{
        array: true
    })
    sizes: string[]

    @ApiProperty({ 
        example: 'women',
        description: 'Product gender',
        
     })
    @Column('text')
    gender: string;

    @ApiProperty()
    @Column('text',{
        array: true,
        default: []
    })
    tags: string[];
    
    @ApiProperty()
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];

    @ManyToOne(
        () => User,
        ( user ) => user.product,
        { eager: true }
    )
    user: User


    @BeforeInsert()
    checkSlugInsert(){
        if ( !this.slug ){
            this.slug = this.title;    
        }
        this.slug = this.slug
        .toLocaleLowerCase()
        .replaceAll(' ','_')
        .replaceAll("'",'')
    }

    @BeforeUpdate()
    checkSlugUpdate(){
        this.slug = this.slug
        .toLocaleLowerCase()
        .replaceAll(' ','_')
        .replaceAll("'",'')
    }
}

    
