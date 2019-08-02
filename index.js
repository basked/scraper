import chalk from 'chalk'
import cherio from 'cherio'
import {arrayFromLength} from './helpers/common'
import {getPageContent} from './helpers/puppeteer'
// const SITE = 'https://auto.ru/catalog/cars/all/?page_num='
//const SITE = 'https://www.21vek.by/early_learning_books/page:'
// const SITE = 'https://www.21vek.by/tv/page:'
const SITE = 'https://www.21vek.by/refrigerators/page:'
const pages = 14;
(async function main() {
    console.log(Date())
    const products = []
    try {

        for (const page of arrayFromLength(pages)) {
            const url = `${SITE}${page}`
            const pageContent = await getPageContent(url)
            const $ = cherio.load(pageContent);

            // $('.result__root').each((i, header) => {
            //     const code = $(header).find('.g-code').text().trim();
            //     const url = $(header).find('a').attr('href');
            //     const name = $(header).find('a>span.result__name').text().trim();
            //     products.push({
            //         code,
            //         url,
            //         name
            //     });
            // });

            $('span.g-item-data.j-item-data').each((i, header) => {
                const data_code = $(header).attr('data-code');
                const data_name = $(header).attr('data-name');
                const data_price = $(header).attr('data-price');
                const data_producer_name = $(header).attr('data-producer_name');
                const data_category = $(header).attr('data-category');
                const data_category_id = $(header).attr('data-category_id');
                const data_status = $(header).attr('data-status');
                const data_special_offer = $(header).attr('data-special_offer');
                const data_is_installment = $(header).attr('data-is_installment');
                const data_is_reduction = $(header).attr('data-is_reduction');
                const data_labels = $(header).attr('data-labels');
                products.push({
                    data_code,
                    data_name,
                    data_price,
                    data_producer_name,
                    data_category,
                    data_category_id,
                    data_status,
                    data_special_offer,
                    data_is_installment,
                    data_is_reduction,
                    data_labels
                });
            });

            console.log(products);
        }

        console.log(Date())
    } catch
        (err) {
        console.log(chalk.red('An error has occured  \n'));
        console.log(err)
    }

})()
