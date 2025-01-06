const buildQueryParams = (params: RequestParams): string => {
  const query = new URLSearchParams();

  // `filters` parametresi varsa, her filtreyi URL'ye ekleyelim
  if (params.filters) {
    for (const [key, value] of Object.entries(params.filters)) {
      if (typeof value === 'object' && value !== null) {
        for (const [operator, operatorValue] of Object.entries(value)) {
          query.append(`filters[${key}][${operator}]`, operatorValue as string);
        }
      } else {
        query.append(`filters[${key}]`, value);
      }
    }
  }

  // Pagination bilgilerini ekleyelim
  if (params.pagination?.page) query.append("pagination[page]", params.pagination.page.toString());
  if (params.pagination?.pageSize) query.append("pagination[pageSize]", params.pagination.pageSize.toString());

  // Sorting bilgilerini ekleyelim
  if (params.sort) query.append("sort", params.sort.join(","));
  
  // Populate ilişkisel verileri ekleyelim
  if (params.populate) {
    // Eğer `populate` parametresi bir dizi veya stringse, doğru formatta ekleyelim
    if (typeof params.populate === 'string') {
      query.append("populate", params.populate);
    } else if (Array.isArray(params.populate)) {
      params.populate.forEach(item => query.append("populate[]", item));
    } else {
      // Eğer iç içe populate kullanıyorsak (nested populate)
      for (const [relation, relationPopulate] of Object.entries(params.populate)) {
        query.append(`populate[${relation}][populate]`, relationPopulate);
      }
    }
  }
  
  // Locale ekleyelim
  if (params.locale) query.append("locale", params.locale);
  
  // Belirtilen alanları (fields) ekleyelim
  if (params.fields) {
    query.append("fields", params.fields.join(","));
  }

  return query.toString();
};

// `getRequest` fonksiyonu
export const getRequest = async (requestParam: RequestParams) => {
  const queryParams = buildQueryParams(requestParam);  // Burada buildQueryParams'ı kullanıyoruz
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParam.controller}?${queryParams}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }

  return await response.json();
};

// Tip tanımlamaları
type RequestParams = {
  controller: string; // Strapi API endpoint, örn: "articles"
  filters?: Record<string, any>; // Filtreleme parametreleri
  pagination?: {
    page?: number; // Sayfa numarası
    pageSize?: number; // Sayfa başına kayıt sayısı
  };
  sort?: string[]; // Sıralama kriterleri, örn: ["createdAt:desc"]
  populate?: string | string[] | Record<string, string>; // İlişkili verileri doldurma
  locale?: string; // Dil, örn: "en" veya "tr"
  fields?: string[]; // Çekilecek alanlar, örn: ["name", "price"]
};