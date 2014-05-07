### generating-ssh-keys

- Step 1: Check for SSH keys

```
cd ~/.ssh
ls -al
```
- Step 2: Generate a new SSH key

```
ssh-keygen -t rsa -C "your_email@example.com"

```
- Step 2.1 免输入密码设置

```
eval `ssh-agent -s`        // 开启ssh-agent服务
ssh-add ~/.ssh/id_rsa.pub

```

- Step 3: Add your SSH key to GitHub

1. In the user bar in the top-right corner of any page, click Account Settings.
2. Click SSH Keys in the left sidebar.
3. Click Add SSH key.
4. ``` clip < ~/.ssh/id_rsa.pub ```
5. Paste to the field

- Step 4: Test everything out

```
ssh -T git@github.com
```

参考：https://help.github.com/articles/generating-ssh-keys



---------

## 使用技巧
1. 添加，提交并推送
```
git add * && git commit -a -m "undate" && git push origin master
```

## 教程

1. http://www-cs-students.stanford.edu/~blynn/gitmagic/index.html