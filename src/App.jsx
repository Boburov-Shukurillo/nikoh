import React, { useState, useEffect } from "react";

const App = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(20);
  const [formData, setFormData] = useState({
    gender: "",
    ageRange: [18, 26],
    character: [],
    convicted: "",
  });
  const [selectedCountry, setSelectedCountry] = useState("");

  const countries = ["Kazakhstan", "Kyrgyzstan", "Uzbekistan", "Russia", "Other"];

  // Avtomatik o'tish funksiyasi
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.gender && selectedCountry && step === 1) {
        setStep(2);
        setProgress(40);
      } else if (step === 2 && formData.ageRange[0] >= 19 && formData.ageRange[1] <= 40) {
        setStep(3);
        setProgress(60);
      } else if (step === 3 && formData.character.length > 0) {
        setStep(4);
        setProgress(80);
      } else if (step === 4 && formData.convicted) {
        setProgress(100);
      }
    }, 1000); // 1 soniyadan keyin o'tadi

    return () => clearTimeout(timer); // Har safar step yoki formData yangilanganda timer to'xtatiladi
  }, [formData, selectedCountry, step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    const isChecked = e.target.checked;
    setFormData({
      ...formData,
      [name]: isChecked
        ? [...formData[name], value]
        : formData[name].filter((item) => item !== value),
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-10 bg-white shadow-md rounded-lg flex flex-col gap-10">
      <h1 className="text-center text-2xl font-semibold mb-6">Nikah Company</h1>

      {/* Step 1: Gender */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Ваш пол</h2>
          <div className="mb-4">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Выберите</option>
              <option value="male">Мужчина</option>
              <option value="female">Женщина</option>
            </select>
          </div>

          <h2 className="text-2xl font-bold mb-6">Выберите Вашу Страну</h2>
          <div className="grid grid-cols-2 gap-4">
            {countries.map((country, index) => (
              <label
                key={index}
                className={`border rounded-lg p-4 text-center cursor-pointer ${selectedCountry === country ? "border-pink-500" : "border-gray-300"
                  }`}
              >
                <input
                  type="radio"
                  name="country"
                  value={country}
                  className="hidden"
                  onChange={() => setSelectedCountry(country)}
                />
                {country}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Age Range */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Возраст будущего супруга</h2>
          <div className="flex items-center mb-6">
            <input
              type="number"
              name="minAge"
              placeholder="19"
              className="w-1/3 p-3 border rounded-lg mr-3"
              value={formData.ageRange[0]}
              onChange={(e) => setFormData({ ...formData, ageRange: [e.target.value, formData.ageRange[1]] })}
            />
            <span className="text-gray-600">–</span>
            <input
              type="number"
              name="maxAge"
              placeholder="40"
              className="w-1/3 p-3 border rounded-lg ml-3"
              value={formData.ageRange[1]}
              onChange={(e) => setFormData({ ...formData, ageRange: [formData.ageRange[0], e.target.value] })}
            />
          </div>
        </div>
      )}

      {/* Step 3: Character */}
      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Ваш характер</h2>
          <div className="grid grid-cols-2 gap-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="character"
                value="good"
                onChange={handleCheckboxChange}
                className="form-checkbox h-5 w-5 text-pink-600"
              />
              <span className="ml-2">Хороший</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="character"
                value="kind"
                onChange={handleCheckboxChange}
                className="form-checkbox h-5 w-5 text-pink-600"
              />
              <span className="ml-2">Добрый</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="character"
                value="caring"
                onChange={handleCheckboxChange}
                className="form-checkbox h-5 w-5 text-pink-600"
              />
              <span className="ml-2">Заботливый</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="character"
                value="modest"
                onChange={handleCheckboxChange}
                className="form-checkbox h-5 w-5 text-pink-600"
              />
              <span className="ml-2">Скромный</span>
            </label>
          </div>
        </div>
      )}

      {/* Step 4: Convicted */}
      {step === 4 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Вы судимы?</h2>
          <div className="grid grid-cols-2 gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="convicted"
                value="yes"
                onChange={handleChange}
                className="form-radio h-5 w-5 text-pink-600"
              />
              <span className="ml-2">Да</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="convicted"
                value="no"
                onChange={handleChange}
                className="form-radio h-5 w-5 text-pink-600"
              />
              <span className="ml-2">Нет</span>
            </label>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200">
              {progress}% Заполнено
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
          <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"></div>
        </div>
      </div>
    </div>
  );
};

export default App;
