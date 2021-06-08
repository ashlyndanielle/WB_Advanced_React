import 'dotenv/config';
import { text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { cloudinaryImage } from '@keystone-next/cloudinary';

export const cloudinary = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_KEY,
    apiSecret: process.env.CLOUDINARY_SECRET,
    folder: 'WBAdvancedReact2021'
}

export const ProductImage = list({
    // access:
    fields: {
        image: cloudinaryImage({
            cloudinary,
            label: 'source',
            isRequired: true
        }),
        altText: text({ isRequired: true })
    }
})