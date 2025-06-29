// Vercel Serverless Function - 数据存储API
let globalData = {
    studentData: [],
    dropoutData: {},
    classStatus: {},
    lastUpdated: null
};

module.exports = (req, res) => {
    // 设置CORS头，允许跨域访问
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // 处理预检请求
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    try {
        switch (req.method) {
            case 'GET':
                // 获取数据
                res.status(200).json({
                    success: true,
                    data: globalData,
                    timestamp: new Date().toISOString()
                });
                break;
                
            case 'POST':
                // 保存数据
                const { studentData, dropoutData, classStatus } = req.body;
                
                // 更新全局数据
                if (studentData !== undefined) globalData.studentData = studentData;
                if (dropoutData !== undefined) globalData.dropoutData = dropoutData;
                if (classStatus !== undefined) globalData.classStatus = classStatus;
                globalData.lastUpdated = new Date().toISOString();
                
                res.status(200).json({
                    success: true,
                    message: '数据保存成功',
                    timestamp: globalData.lastUpdated
                });
                break;
                
            case 'PUT':
                // 更新特定数据
                const updateData = req.body;
                globalData = { ...globalData, ...updateData };
                globalData.lastUpdated = new Date().toISOString();
                
                res.status(200).json({
                    success: true,
                    message: '数据更新成功',
                    timestamp: globalData.lastUpdated
                });
                break;
                
            case 'DELETE':
                // 清空数据
                globalData = {
                    studentData: [],
                    dropoutData: {},
                    classStatus: {},
                    lastUpdated: new Date().toISOString()
                };
                
                res.status(200).json({
                    success: true,
                    message: '数据已清空',
                    timestamp: globalData.lastUpdated
                });
                break;
                
            default:
                res.status(405).json({ success: false, message: 'Method not allowed' });
        }
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({
            success: false,
            message: '服务器内部错误',
            error: error.message
        });
    }
}
