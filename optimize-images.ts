import fs from 'fs';
import path from 'path';

function walkDir(dir: string, callback: (file: string) => void) {
    fs.readdirSync(dir).forEach(f => {
        const dirPath = path.join(dir, f);
        const isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const replacePexels = (content: string) => {
    return content.replace(/https:\/\/images\.pexels\.com\/photos\/\d+\/pexels-photo-\d+\.([a-z]+)(\?[^"'\>\s]*)?/g, (match, ext, query) => {
        const base = match.split('?')[0];
        return `${base}?auto=compress&cs=tinysrgb&q=60&w=800`;
    });
};

const replaceUnsplash = (content: string) => {
    return content.replace(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+(\?[^"'\>\s]*)?/g, (match) => {
        const base = match.split('?')[0];
        return `${base}?auto=format&fit=crop&q=60&w=800&fm=avif`;
    });
};

walkDir('./src', function(filePath: string) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let newContent = content;
        
        if (!filePath.includes('Home.tsx')) {
            newContent = replacePexels(newContent);
            newContent = replaceUnsplash(newContent);
        }

        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Optimized images in ${filePath}`);
        }
    }
});
