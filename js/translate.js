var words_in_list;


function trsl() {

	if (!is_chinese())
		return this;

console.log('!');

	if (!words_in_list)
		words_in_list = word_list();

	var word = jQuery.grep(words_in_list, function(item) {
                        return item.en == this;
                      });
	if (word.length > 0)
	{
		return word[0].cn;
	}
    return this;
}

function trsl_arr() {
	var arr = [];
	for (var i = 0; i < this.length; i++) {
		arr.push(this[i].trsl());
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
		}
	];

	return words;
}