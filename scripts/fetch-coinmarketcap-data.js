import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async function () {
	let res = await fetch(
		'https://api.coinmarketcap.com/data-api/v3/map/all?listing_status=active,untracked&exchangeAux=is_active,status&cryptoAux=is_active,status&start=1&limit=10000',
	);
	const map = {};
	let info = await res.json();
	info.data.cryptoCurrencyMap.map((i) => {
		// map[i.symbol] = i.slug;
		if (!map[i.symbol]) {
			map[i.symbol] = i.name;
		}
	});
	res = await fetch(
		'https://api.coinmarketcap.com/data-api/v3/map/all?listing_status=active,untracked&exchangeAux=is_active,status&cryptoAux=is_active,status&start=10001&limit=10000',
	);
	info = await res.json();
	// symbolNameMap = symbolNameMap.concat(
	// 	info.data.cryptoCurrencyMap.map((i) => ({s: i.symbol, l: i.slug})),
	// );
	info.data.cryptoCurrencyMap.map((i) => {
		// map[i.symbol] = i.slug;
		if (!map[i.symbol]) {
			map[i.symbol] = i.name;
		}
	});

	fs.writeFileSync(`${__dirname}/../sn-map.json`, JSON.stringify(map));
})();
