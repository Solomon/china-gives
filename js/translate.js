var words_in_list;

function trsl(str) {
	if (!is_chinese())
		return str;

	if (!words_in_list)
		words_in_list = word_list();

	var word = jQuery.grep(words_in_list, function(item) {
                        return item.en == str;
                      });
	if (word.length > 0)
	{
		return word[0].cn;
	}
    return str;
}

function trsl_arr(par) {
	var arr = [];
	for (var i = 0; i < par.length; i++) {
		arr.push(trsl(par[i]));
	};
    return arr;
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
			en: 'Sep 14',
			cn: '14年9月'
		},
		{
			en: 'Oct 14',
			cn: '14年10月'
		},
		{
			en: 'Nov 14',
			cn: '14年11月'
		},
		{
			en: 'Dec 14',
			cn: '14年12月'
		},
		{
			en: 'Jan 15',
			cn: '15年1月'
		},
		{
			en: 'Feb 15',
			cn: '15年2月'
		},
		{
			en: 'Mar 15',
			cn: '15年3月'
		},
		{
			en: 'Apr 15',
			cn: '15年4月'
		},
		{
			en: 'May 15',
			cn: '15年5月'
		},
		{
			en: 'Jun 15',
			cn: '15年6月'
		},
		{
			en: 'Jul 15',
			cn: '15年7月'
		},
		{
			en: 'Aug 15',
			cn: '15年8月'
		}
	];

	return words;
}