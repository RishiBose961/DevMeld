const Codesubmit = () => {
  return (
    <div className="border-t pt-6 mb-5">
      <h4 className="font-medium  mb-4">Submit Your Solution</h4>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium  mb-2">
            Solution Description
          </label>
          <textarea
            placeholder="Explain your approach and key decisions..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium  mb-2">
            Code Solution
          </label>
          <textarea
            placeholder="Paste your code here..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            rows={12}
          />
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]">
          Submit Solution
        </button>
      </div>
    </div>
  );
};

export default Codesubmit;
