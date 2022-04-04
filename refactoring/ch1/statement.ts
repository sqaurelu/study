/* 비용 책정 프로그램
  - 장르: 비극, 희극
  - 공연료
  - 포인트
*/

type Performancee = {
	playId: string;
	audience: number;
};

type Invoice = {
	customer: string;
	performances: Performancee[];
};

type Play = {
	name: string;
	type: 'tragedy' | 'comedy';
};

type Name = 'hamlet' | 'as-like' | 'othello';

type Plays = {
	hamlet: { name: 'Hamlet'; type: 'tragedy' };
	asLike: { name: 'As You Like It'; type: 'comedy' };
	othello: { name: 'Othello'; type: 'tragedy' };
	// [K in Name]: any;
};

const statement = (invoice: Invoice, plays: Plays) => {
	let totalAmount = 0;
	let volumeCredits = 0;
	let result = `청구 내역 (고객명: ${invoice.customer})\n`;

	const format = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
	}).format;

	for (let perf of invoice.performances) {
		const play = plays[perf.playId];
		let thisAmount = 0;

		switch (play.type) {
			case 'tragedy':
				thisAmount = 40000;
				if (perf.audience > 30) {
					thisAmount += 1000 * (perf.audience - 30);
				}
				break;
			case 'comedy':
				thisAmount = 30000;
				if (perf.audience > 20) {
					thisAmount += 10000 + 500 * (perf.audience - 20);
				}
				thisAmount += 300 * perf.audience;
				break;
			default:
				throw new Error(`알 수 없는 장르: ${play.type}`);
		}

		// 포인트 적립
		volumeCredits += Math.max(perf.audience - 30, 0);
		// 희극 관객 5명마다 추가 포인트 제공
		if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);
	}

	result += `총액: ${format(totalAmount / 100)}\n`;
	result += `적립 포인트: ${volumeCredits}점\n`;
	return result;
};
