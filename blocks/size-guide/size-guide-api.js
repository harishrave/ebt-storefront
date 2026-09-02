const ATTRIBUTE_CODE = 'size_guide_enabled';

const query = `
  query SizeGuideProduct($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
      items {
        sku
        ${ATTRIBUTE_CODE}
      }
    }
  }
`;

function normalizeBoolean(value) {
  return value === true || value === 1 || value === '1' || value === 'true';
}

async function postGraphql(endpoint, body) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(body),
  });

  const payload = await response.json();
  if (!response.ok) {
    const error = new Error(payload?.message || `GraphQL request failed with ${response.status}`);
    error.response = response;
    error.payload = payload;
    throw error;
  }

  if (payload.errors?.length) {
    const error = new Error(payload.errors.map((entry) => entry.message).join('; '));
    error.payload = payload;
    throw error;
  }

  return payload;
}

export async function isSizeGuideEnabled({ sku, endpoint, headers = {} }) {
  if (!sku || !endpoint) {
    return false;
  }

  try {
    const payload = await postGraphql(endpoint, {
      query,
      variables: { sku },
    });

    const item = payload?.data?.products?.items?.[0];
    return normalizeBoolean(item?.[ATTRIBUTE_CODE]);
  } catch (error) {
    console.error('size-guide-api.fetch-failed', {
      operation: 'size-guide-api.isSizeGuideEnabled',
      sku,
      error: error?.message,
    });
    return false;
  }
}

export { ATTRIBUTE_CODE };
