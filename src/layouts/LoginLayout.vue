<template>
    <div class="login-container">
        <el-form class="login-form">
            <div class="form-title">
                <div>{{ $t('login.title') }}</div>
                <lang-select></lang-select>
            </div>
            <el-form-item>
                <el-input />
            </el-form-item>
            <el-form-item>
                <el-input />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import LangSelect from "components/LangSelect/index";

export default {
    name: "LoginLayout",
    components: { LangSelect }
}
</script>


<style lang="less">
    .login-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .login-form {
        width: 400px;
    }
    .form-title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }
</style>


