import { HiXMark } from 'react-icons/hi2';

function Modal({
  children,
  isOpen,
  onClose,
  title,
  hideHeader,
  showActionBtn,
  actionBtnText,
  actionBtnIcon,
  onActionClick,
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full backdrop-brightness-50">
      <div
        className={`relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden lg:mx-10 lg:px-10`}
      >
        {/* Modal Header */}
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200 ">
            <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>
            {showActionBtn && (
              <button
                className="btn-small-light mr-12 "
                onClick={() => onActionClick()}
              >
                {actionBtnText}
                {actionBtnIcon}
              </button>
            )}
          </div>
        )}

        <button
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5 cursor-pointer"
          onClick={onClose}
          type="button"
        >
          <HiXMark size={20} />
        </button>

        {/* Modal Body (Scrollable) */}

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
