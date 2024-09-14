export function slugify(str: string): string {
  let formattedSlug = str.toLowerCase()

  const accentMapping: { [key: string]: string } = {
    á: 'a',
    à: 'a',
    ă: 'a',
    ắ: 'a',
    ằ: 'a',
    ẵ: 'a',
    ẳ: 'a',
    â: 'a',
    ấ: 'a',
    ầ: 'a',
    ẫ: 'a',
    ẩ: 'a',
    ã: 'a',
    ả: 'a',
    ạ: 'a',
    ặ: 'a',
    ậ: 'a',
    đ: 'd',
    é: 'e',
    è: 'e',
    ê: 'e',
    ế: 'e',
    ề: 'e',
    ễ: 'e',
    ể: 'e',
    ẽ: 'e',
    ẻ: 'e',
    ẹ: 'e',
    ệ: 'e',
    í: 'i',
    ì: 'i',
    ĩ: 'i',
    ỉ: 'i',
    ị: 'i',
    ó: 'o',
    ò: 'o',
    ô: 'o',
    ố: 'o',
    ồ: 'o',
    ỗ: 'o',
    ổ: 'o',
    õ: 'o',
    ỏ: 'o',
    ơ: 'o',
    ớ: 'o',
    ờ: 'o',
    ỡ: 'o',
    ở: 'o',
    ợ: 'o',
    ọ: 'o',
    ộ: 'o',
    ú: 'u',
    ù: 'u',
    ũ: 'u',
    ủ: 'u',
    ư: 'u',
    ứ: 'u',
    ừ: 'u',
    ữ: 'u',
    ử: 'u',
    ự: 'u',
    ụ: 'u',
    ý: 'y',
    ỳ: 'y',
    ỹ: 'y',
    ỷ: 'y',
    ỵ: 'y',
  }

  for (const [accentedChar, replacement] of Object.entries(accentMapping)) {
    const regex = new RegExp(accentedChar, 'g')
    formattedSlug = formattedSlug.replace(regex, replacement)
  }

  formattedSlug = formattedSlug
    .replaceAll(/[^0-9a-z\s-]/g, '')
    .replaceAll(/\s+/g, '-')
    .replaceAll(/-+/g, '-')
    .replaceAll(/^-+|-+$/g, '')

  return formattedSlug
}
