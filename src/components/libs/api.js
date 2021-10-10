const FIREBASE_DOMAIN = 'https://movie-reco-dca89-default-rtdb.asia-southeast1.firebasedatabase.app';


export async function addComment(requestData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${requestData.movieId}.json`, {
    method: 'POST',
    body: JSON.stringify(requestData.commentData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not add comment.');
  }

  return { commentId: data.name };
}

export async function getAllComments(movieId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${movieId}.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not get comments.');
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };
    transformedComments.push(commentObj);
  }

  return transformedComments;
}
