import React from 'react';

const Comments = ({ comments }) => {
  return (
    <div className='mt-4'>
      {comments.length > 0 ? (
        comments.map((comment, idx) => (
          <div key={idx} className='border-t pt-2'>
            <p className="text-sm">
              <strong className="mr-8">{comment.username}:</strong> {comment.text}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}
    </div>
  );
}

export default Comments;
