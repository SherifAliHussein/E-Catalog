﻿// ------------------------------------------------------------------------------
//  <auto-generated>
//      This code was generated by SpecFlow (http://www.specflow.org/).
//      SpecFlow Version:2.2.0.0
//      SpecFlow Generator Version:2.2.0.0
// 
//      Changes to this file may cause incorrect behavior and will be lost if
//      the code is regenerated.
//  </auto-generated>
// ------------------------------------------------------------------------------
#region Designer generated code
#pragma warning disable
namespace ECatalog.BLL.Test.Admin.AddNewRestaurant
{
    using TechTalk.SpecFlow;
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("TechTalk.SpecFlow", "2.2.0.0")]
    [System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [NUnit.Framework.TestFixtureAttribute()]
    [NUnit.Framework.DescriptionAttribute("admin add new restaurant")]
    public partial class AdminAddNewRestaurantFeature
    {
        
        private TechTalk.SpecFlow.ITestRunner testRunner;
        
#line 1 "AdminAddNewRestaurant.feature"
#line hidden
        
        [NUnit.Framework.OneTimeSetUpAttribute()]
        public virtual void FeatureSetup()
        {
            testRunner = TechTalk.SpecFlow.TestRunnerManager.GetTestRunner();
            TechTalk.SpecFlow.FeatureInfo featureInfo = new TechTalk.SpecFlow.FeatureInfo(new System.Globalization.CultureInfo("en-US"), "admin add new restaurant", "In order to add new restaurant\r\nAs a admin\r\nI want to add new restaurant", ProgrammingLanguage.CSharp, ((string[])(null)));
            testRunner.OnFeatureStart(featureInfo);
        }
        
        [NUnit.Framework.OneTimeTearDownAttribute()]
        public virtual void FeatureTearDown()
        {
            testRunner.OnFeatureEnd();
            testRunner = null;
        }
        
        [NUnit.Framework.SetUpAttribute()]
        public virtual void TestInitialize()
        {
        }
        
        [NUnit.Framework.TearDownAttribute()]
        public virtual void ScenarioTearDown()
        {
            testRunner.OnScenarioEnd();
        }
        
        public virtual void ScenarioSetup(TechTalk.SpecFlow.ScenarioInfo scenarioInfo)
        {
            testRunner.OnScenarioStart(scenarioInfo);
        }
        
        public virtual void ScenarioCleanup()
        {
            testRunner.CollectScenarioErrors();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("admin add new restaurant")]
        public virtual void AdminAddNewRestaurant()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("admin add new restaurant", ((string[])(null)));
#line 6
this.ScenarioSetup(scenarioInfo);
#line 7
testRunner.Given("I am logged in as a admin to add new restaurant", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 8
testRunner.When("I entered restaurant name and description and logo and select restaurant type and" +
                    " username for restaurant admin and password", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 9
testRunner.And("I click on add restaurant", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 10
testRunner.Then("the restaurant will be added successfully deactivated", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("admin add new restaurant without entering restaurant name")]
        public virtual void AdminAddNewRestaurantWithoutEnteringRestaurantName()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("admin add new restaurant without entering restaurant name", ((string[])(null)));
#line 12
this.ScenarioSetup(scenarioInfo);
#line 13
testRunner.Given("I am logged in as a admin to add new restaurant", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 14
testRunner.When("I left restaurant name and select restaurant type", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 15
testRunner.And("I click on add restaurant", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 16
testRunner.Then("Missing restaurant name validation message will return", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("admin add new restaurant with existing name")]
        public virtual void AdminAddNewRestaurantWithExistingName()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("admin add new restaurant with existing name", ((string[])(null)));
#line 18
this.ScenarioSetup(scenarioInfo);
#line 19
testRunner.Given("I am logged in as a admin to add new restaurant", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 20
testRunner.When("I entered existing restaurant name", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 21
testRunner.And("I click on add restaurant", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 22
testRunner.Then("repeated restaurant name validation message will return", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("admin add new restaurant name with more than 300 characters")]
        public virtual void AdminAddNewRestaurantNameWithMoreThan300Characters()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("admin add new restaurant name with more than 300 characters", ((string[])(null)));
#line 25
this.ScenarioSetup(scenarioInfo);
#line 26
testRunner.Given("I am logged in as a admin to add new restaurant", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 27
testRunner.When("I entered restaurant name with more than 300 characters", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 28
testRunner.And("I click on add restaurant", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 29
testRunner.Then("Maximum length for restaurant name validation message will return", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("admin add new restaurant without entering restaurant description")]
        public virtual void AdminAddNewRestaurantWithoutEnteringRestaurantDescription()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("admin add new restaurant without entering restaurant description", ((string[])(null)));
#line 31
this.ScenarioSetup(scenarioInfo);
#line 32
testRunner.Given("I am logged in as a admin to add new restaurant", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 33
testRunner.When("I left restaurant description and select restaurant type", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 34
testRunner.And("I click on add restaurant", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 35
testRunner.Then("Missing restaurant description validation message will return", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("admin add new restaurant without entering username for restaurant admin")]
        public virtual void AdminAddNewRestaurantWithoutEnteringUsernameForRestaurantAdmin()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("admin add new restaurant without entering username for restaurant admin", ((string[])(null)));
#line 38
this.ScenarioSetup(scenarioInfo);
#line 39
testRunner.Given("I am logged in as a admin to add new restaurant", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 40
testRunner.When("I left username for restaurant admin", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 41
testRunner.And("I click on add restaurant", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 42
testRunner.Then("Missing admin username validation message will return", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("admin add new restaurant without entering password for restaurant admin")]
        public virtual void AdminAddNewRestaurantWithoutEnteringPasswordForRestaurantAdmin()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("admin add new restaurant without entering password for restaurant admin", ((string[])(null)));
#line 44
this.ScenarioSetup(scenarioInfo);
#line 45
testRunner.Given("I am logged in as a admin to add new restaurant", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 46
testRunner.When("I left password for restaurant admin", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 47
testRunner.And("I click on add restaurant", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 48
testRunner.Then("Missing admin password validation message will return", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("admin add new restaurant with existing username for restaurant admin")]
        public virtual void AdminAddNewRestaurantWithExistingUsernameForRestaurantAdmin()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("admin add new restaurant with existing username for restaurant admin", ((string[])(null)));
#line 50
this.ScenarioSetup(scenarioInfo);
#line 51
testRunner.Given("I am logged in as a admin to add new restaurant", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 52
testRunner.When("I entered existing username for restaurant admin", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 53
testRunner.And("I click on add restaurant", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 54
testRunner.Then("repeated username for restaurant admin validation message will return", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("admin add new restaurant with short password for restaurant admin")]
        public virtual void AdminAddNewRestaurantWithShortPasswordForRestaurantAdmin()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("admin add new restaurant with short password for restaurant admin", ((string[])(null)));
#line 56
this.ScenarioSetup(scenarioInfo);
#line 57
testRunner.Given("I am logged in as a admin to add new restaurant", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 58
testRunner.When("I entered short password for restaurant admin", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 59
testRunner.And("I click on add restaurant", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 60
testRunner.Then("Minimum password length 8 characters validation message will return", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("admin add new restaurant with long password for restaurant admin")]
        public virtual void AdminAddNewRestaurantWithLongPasswordForRestaurantAdmin()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("admin add new restaurant with long password for restaurant admin", ((string[])(null)));
#line 62
this.ScenarioSetup(scenarioInfo);
#line 63
testRunner.Given("I am logged in as a admin to add new restaurant", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 64
testRunner.When("I entered long password for restaurant admin", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 65
testRunner.And("I click on add restaurant", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 66
testRunner.Then("Maximum password length 25 characters validation message will return", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
    }
}
#pragma warning restore
#endregion
