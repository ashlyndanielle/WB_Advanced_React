import { integer, relationship, select, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Product = list({
    // access:
    fields: {
        name: text({ isRequired: true }),
        description: text({
            ui: {
                displayMode: 'textarea'
            }
        }),
        photo: relationship({
            ref: 'ProductImage.product', // This is mirrored as 'Product.photo' in the ProductImage
            ui: {
                displayMode: 'cards',
                cardFields: ['image', 'altText'], // what fields display from image
                inlineConnect: true,
                inlineCreate: {
                    fields: ['image', 'altText']
                },
                inlineEdit: {
                    fields: ['image', 'altText']
                }
            }
        }),
        status: select({
            dataType: 'string', // this is the default if you don't set it
            options: [
                { label: 'Draft', value: 'DRAFT' },
                { label: 'Available', value: 'AVAILABLE' },
                { label: 'Unavailable', value: 'UNAVAILABLE' }
            ],
            defaultValue: 'DRAFT',
            ui: {
                displayMode: 'segmented-control',
                createView: { fieldMode: 'hidden' } // hides field when creating product
            }
        }),
        price: integer(),
    },
    ui: {
        listView: {
            initialColumns: ['name', 'status'] // inital visible columns in product list
        }
    }
})