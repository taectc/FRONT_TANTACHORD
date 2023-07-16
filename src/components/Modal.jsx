import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ title, children, width = 27, open, onClose }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);
  return createPortal(
    <>
      {open && (
        <>
          <div className="fixed inset-0 bg-white opacity-70 z-20"></div>
          <div className="fixed inset-0 z-30" onMouseUp={onClose}>
            <div className="flex justify-center items-center min-h-full p-4">
              <div
                style={{ maxWidth: `${width}rem` }}
                className="bg-white rounded-lg w-full shadow-[0_0_15px_rgb(0_0_0_/0.2)] overflow-hidden max-h-[calc(100vh-2rem)] "
                onMouseUp={e => e.stopPropagation()}
              >
                <div
                  className="flex justify-end pr-3 pt-2 text-gray-500 font-semibold hover:text-gray-600"
                  role="button"
                  onClick={onClose}
                >
                  &#10005;
                </div>

                <div className="p-4">{children}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </>,
    document.getElementById('modal')
  );
}
