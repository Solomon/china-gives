var words_in_list;
var chart_data_for_trsl;

function trsl(str) {
	if (!is_chinese())
		return str;

	if (!words_in_list)
		words_in_list = word_list();

	var mlny = false;
	if (str.indexOf(' (Million Yuan)') >= 0){
		str = str.replace(' (Million Yuan)', '');
		mlny = true;
	}

	var word = jQuery.grep(words_in_list, function(item) {
                        return item.en == str;
                      });
	if (word.length > 0)
	{
		var res = word[0].cn;
		if (mlny)
			res += '（100万元）';
		return res;
	}
    return str;
}

function trsl_leader(str) {
	if (!is_chinese())
		return str;

	if (!chart_data_for_trsl)
		chart_data_for_trsl = chart_data();
	var pers = jQuery.grep(chart_data_for_trsl, function(item) {
                        return item['Name Eng'] == str;
                      });
	if (pers.length > 0)
		return pers[0]['Name CN'];
	return str;
}

function trsl_arr(par) {
	var arr = [];
	for (var i = 0; i < par.length; i++) {
		arr.push(trsl(par[i]));
	};
    return arr;
}

function trsl_int(n){	
	if (!is_chinese())
		return n + '';
	n = parseInt(n.replace('¥', '').replace('m', '').replace('mln', '').replace('Million', ''));
	if (n < 100)
		return n + '00万元';
	return (parseFloat(n) / 100).toFixed(2) + '亿元';
}

function is_chinese(){
	return window.location.href.indexOf('/cn/') >= 0;
}

function word_list(){
	var words = [
		{
			en: 'Manufacturing',
			cn: '制造业'
		},
		{
			en: 'Real Estate',
			cn: '房地产'
		},
		{
			en: 'Energy',
			cn: '能源'
		},
		{
			en: 'Tech/IT',
			cn: '科技'
		},
		{
			en: 'Finance',
			cn: '金融'
		},
		{
			en: 'Education',
			cn: '教育'
		},
		{
			en: 'Consumer',
			cn: '消费'
		},
		{
			en: 'Healthcare',
			cn: '医疗'
		},
		{
			en: 'Transportation',
			cn: '交通'
		},
		{
			en: 'Other',
			cn: '其他'
		},
		{
			en: 'Donation Scale',
			cn: '捐赠规模'
		},
		{
			en: 'Total Amount',
			cn: '捐赠总额'
		},
		{
			en: 'Generosity %',
			cn: '慷慨指数'
		},
		{
			en: 'National Total %',
			cn: '全国捐赠总额占比'
		},
		{
			en: 'Generosity Index',
			cn: '慷慨指数'
		},
		{
			en: 'Industry',
			cn: '行业'
		},
		{
			en: 'Total Amount',
			cn: '捐赠总额'
		},
		{
			en: 'Diversity Index',
			cn: '多样性指数'
		},
		{
			en: 'Focus Areas',
			cn: '关注领域'
		},
		{
			en: 'Age',
			cn: '年龄'
		},
		{
			en: 'Chronological',
			cn: '时间轴'
		},
		{
			en: 'Total Donations',
			cn: '总捐赠额'
		},
		{
			en: 'Culture Donations',
			cn: '文化捐赠总额'
		},
		{
			en: 'Social Welfare Donations',
			cn: '社会福利捐赠总额'
		},
		{
			en: 'Disaster Relief Donations',
			cn: '救灾捐赠总额'
		},
		{
			en: 'Environment Donations',
			cn: '环保捐赠总额'
		},
		{
			en: 'Education Donations',
			cn: '教育捐赠总额'
		},
		{
			en: 'Healthcare Donations',
			cn: '医疗捐赠总额'
		},
		{
			en: 'Sep 14',
			cn: '2014年9月'
		},
		{
			en: 'Oct 14',
			cn: '2014年10月'
		},
		{
			en: 'Nov 14',
			cn: '2014年11月'
		},
		{
			en: 'Dec 14',
			cn: '2014年12月'
		},
		{
			en: 'Jan 15',
			cn: '2015年1月'
		},
		{
			en: 'Feb 15',
			cn: '2015年2月'
		},
		{
			en: 'Mar 15',
			cn: '2015年3月'
		},
		{
			en: 'Apr 15',
			cn: '2015年4月'
		},
		{
			en: 'May 15',
			cn: '2015年5月'
		},
		{
			en: 'Jun 15',
			cn: '2015年6月'
		},
		{
			en: 'Jul 15',
			cn: '2015年7月'
		},
		{
			en: 'Aug 15',
			cn: '2015年8月'
		}
	];

	return words;
}