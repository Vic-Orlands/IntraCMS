const Sidebar = () => (
  <aside className="w-1/4 p-5 bg-white rounded-md shadow-md">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Page Structure</h3>
    <ul className="space-y-3">
      <li className="flex items-center text-sm text-gray-600">
        <span className="mr-2">📄</span> Header/Title
      </li>
      <li className="flex items-center text-sm text-gray-600">
        <span className="mr-2">🖼️</span> Cover Image
      </li>
      <li className="flex items-center text-sm text-gray-600">
        <span className="mr-2">📝</span> Body
      </li>
      <li className="flex items-center text-sm text-gray-600">
        <span className="mr-2">🔍</span> Footer
      </li>
    </ul>
  </aside>
);

export default Sidebar;
