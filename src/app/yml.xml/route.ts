import { NextResponse } from 'next/server';

import { ICategoryDto } from '@/entities/category';
import { IProductDto } from '@/entities/product/api';
import { BASE_URL } from '@/shared/consts';

export async function GET() {
  try {
    const categoriesResponse = await fetch(
      BASE_URL + '/api/product_categories',
      {
        cache: 'no-store',
      },
    );
    const productsResponse = await fetch(BASE_URL + '/api/products', {
      cache: 'no-store',
    });

    const categories = (await categoriesResponse.json()) as ICategoryDto[];
    const products = (await productsResponse.json()) as IProductDto[];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="${new Date().toISOString()}">
  <shop>
    <name>Dc-mining</name>
    <company>Dc-mining</company>
    <url>https://dc-mining.ru/</url>
    <currencies><currency id="RUB" rate="1"/></currencies>
    <categories>
    ${categories
      .map((category) => {
        return `<category id="${category.id}">${category.title}</category>`;
      })
      .join('')}
    </categories>
    <offers>
      ${products
        .map((product) => {
          return `
            <offer id="${product.id}" available="true">
              <url>https://dc-mining.ru/product/${product.slug}</url>
              <price>${product.price}</price>
              <currencyId>RUB</currencyId>
              <categoryId>${product.category?.id}</categoryId>
              <picture>${BASE_URL}${product.images[0].image}</picture>
              <delivery>true</delivery>
              <vendor>${product.productSubCategory.title || 'Dc-mining'}</vendor>
              <name>${product.title}</name>
              <description><![CDATA[${product.shortDescription}]]></description>
            </offer>
            `;
        })
        .join('')}
    </offers>
  </shop>
</yml_catalog>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  } catch (error) {
    return new NextResponse('Error yml.xml', { status: 500 });
  }
}
