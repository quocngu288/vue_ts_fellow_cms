const dictionary = {
  en: {
    required_custom: '{field} is required',
    max: 'Please enter within 0:{length} characters',
    phone_regex: 'Please enter 10 to 11 single-byte numbers (no hyphens)',
    password_confirmed: 'Passwords do not match',
    password_regex: 'Please enter at least 8 single-byte alphanumeric characters',
    special_characters_regex: ';<=>/[\\]{|} cannot be entered',
    email_custom: 'Please enter in email address format',
    url_custom: 'Please enter in URL format',
    select_up_to_3: 'Please select up to 3',
    radio_required_custom: 'Please choose one',
    required_other: 'Please enter if you select other',
    xlsx_regex: 'Please upload a file with the extension [.xlsx]',
    hiragana_regex: 'Only hiragana is valid'
  },
  ja: {
    required_custom: '{field}は必須項目です',
    max: '0:{length}文字以内で入力してください',
    phone_regex: '半角数字10~11桁（ハイフンなし）で入力してください',
    password_confirmed: 'パスワードが一致しません',
    password_regex: '半角英数字8桁以上で入力してください ',
    special_characters_regex: '半角記号　;<=>/[]{|}￥　は入力できません。全角で入力してください。',
    email_custom: 'メールアドレス形式で入力してください',
    url_custom: 'URLの形式で入力してください',
    select_up_to_3: '3つまで選択してください',
    radio_required_custom: 'どちらかを選択してください',
    required_other: 'その他を選択する場合は入力してください',
    xlsx_regex: '【.xlsx】の拡張子のファイルをアップロードしてください',
    hiragana_regex: 'ひらがなのみ有効です'
  }
}

export default dictionary
