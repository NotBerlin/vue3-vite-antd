const $_API = {}

const moduleFiles = import.meta.globEager('./modules/*.js');
Object.keys(moduleFiles).forEach((moduleFile, moduleIndex) => {
    Object.keys(moduleFiles[moduleFile].default).forEach(moduleFileKey => {
        $_API[moduleFileKey] = moduleFiles[moduleFile].default[moduleFileKey]
    })
});

export default $_API